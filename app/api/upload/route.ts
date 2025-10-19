import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const formData = await request.formData()
    const file = formData.get('file') as File
    const bucket = formData.get('bucket') as string || 'general'
    const folder = formData.get('folder') as string || ''

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'File type not allowed' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.name.split('.').pop()
    const sanitizedName = file.name
      .split('.')[0]
      .replace(/[^a-zA-Z0-9]/g, '_')
      .toLowerCase()

    const filename = `${sanitizedName}_${timestamp}.${extension}`
    const filepath = folder ? `${folder}/${filename}` : filename

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filepath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Storage upload error:', error)
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return NextResponse.json({
      message: 'File uploaded successfully',
      path: data.path,
      url: publicUrlData.publicUrl,
      filename: filename,
      size: file.size,
      type: file.type
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    const bucket = searchParams.get('bucket') || 'general'

    if (!path) {
      return NextResponse.json(
        { error: 'File path is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      console.error('Storage delete error:', error)
      return NextResponse.json(
        { error: 'Failed to delete file' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'File deleted successfully'
    })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const bucket = searchParams.get('bucket') || 'general'
    const folder = searchParams.get('folder') || ''
    const limit = parseInt(searchParams.get('limit') || '50')

    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit: limit,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      console.error('Storage list error:', error)
      return NextResponse.json(
        { error: 'Failed to list files' },
        { status: 500 }
      )
    }

    // Add public URLs to each file
    const filesWithUrls = data?.map(file => {
      const path = folder ? `${folder}/${file.name}` : file.name
      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(path)

      return {
        ...file,
        path: path,
        url: publicUrlData.publicUrl
      }
    }) || []

    return NextResponse.json(filesWithUrls)

  } catch (error) {
    console.error('List error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}