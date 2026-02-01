/**
 * Unit tests for mapper functions
 */

import {
  mapSanityImage,
  mapHomepage,
  mapPost,
  mapProject,
  mapPosts,
  mapProjects,
} from '@/lib/sanity/mappers'
import type {
  SanityHomepage,
  SanityPost,
  SanityProject,
  SanityImage,
} from '@/types/cms'

// Mock the image module
jest.mock('@/lib/sanity/image', () => ({
  urlFor: jest.fn((image: any) => ({
    url: () => `https://cdn.sanity.io/images/test/${image.asset._ref}`,
  })),
  getImageAlt: jest.fn((image: any, fallback: string) => image?.alt || fallback),
}))

describe('mapSanityImage', () => {
  it('should map a Sanity image to a processed image', () => {
    const sanityImage: SanityImage = {
      _type: 'image',
      asset: {
        _ref: 'image-123',
        _type: 'reference',
      },
      alt: 'Test image',
    }

    const result = mapSanityImage(sanityImage, 'Fallback')
    
    expect(result).toBeDefined()
    expect(result?.url).toContain('image-123')
    expect(result?.alt).toBe('Test image')
  })

  it('should return undefined for null image', () => {
    const result = mapSanityImage(null, 'Fallback')
    expect(result).toBeUndefined()
  })

  it('should return undefined for undefined image', () => {
    const result = mapSanityImage(undefined, 'Fallback')
    expect(result).toBeUndefined()
  })

  it('should return undefined for image without asset', () => {
    const sanityImage = {
      _type: 'image',
      alt: 'Test',
    } as SanityImage

    const result = mapSanityImage(sanityImage, 'Fallback')
    expect(result).toBeUndefined()
  })
})

describe('mapHomepage', () => {
  const mockHomepage: SanityHomepage = {
    _id: 'homepage-1',
    _type: 'homepage',
    name: 'John Doe',
    title: 'Software Engineer',
    tagline: 'Building amazing things',
    headshot: {
      _type: 'image',
      asset: {
        _ref: 'image-headshot',
        _type: 'reference',
      },
      alt: 'John Doe headshot',
    },
    bio: 'Experienced software engineer',
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
    contact: {
      email: 'john@example.com',
      location: 'San Francisco, CA',
    },
  }

  it('should map homepage document correctly', () => {
    const result = mapHomepage(mockHomepage)

    expect(result.name).toBe('John Doe')
    expect(result.title).toBe('Software Engineer')
    expect(result.tagline).toBe('Building amazing things')
    expect(result.bio).toBe('Experienced software engineer')
    expect(result.headshot).toBeDefined()
    expect(result.headshot.url).toContain('image-headshot')
    expect(result.socialLinks.github).toBe('https://github.com/johndoe')
    expect(result.contact.email).toBe('john@example.com')
  })

  it('should throw error if headshot is missing', () => {
    const invalidHomepage = {
      ...mockHomepage,
      headshot: null,
    } as any

    expect(() => mapHomepage(invalidHomepage)).toThrow('Homepage headshot is required')
  })

  it('should handle missing optional fields', () => {
    const minimalHomepage: SanityHomepage = {
      _id: 'homepage-2',
      _type: 'homepage',
      name: 'Jane Doe',
      title: 'Developer',
      tagline: 'Code enthusiast',
      headshot: {
        _type: 'image',
        asset: {
          _ref: 'image-jane',
          _type: 'reference',
        },
      },
      bio: 'Love coding',
    }

    const result = mapHomepage(minimalHomepage)

    expect(result.name).toBe('Jane Doe')
    expect(result.socialLinks).toEqual({})
    expect(result.contact).toEqual({})
  })
})

describe('mapPost', () => {
  const mockPost: SanityPost = {
    _id: 'post-1',
    _type: 'post',
    title: 'Test Blog Post',
    excerpt: 'This is a test post',
    slug: { current: 'test-blog-post', _type: 'slug' },
    publishedDate: '2024-01-15',
    thumbnail: {
      _type: 'image',
      asset: {
        _ref: 'image-thumb',
        _type: 'reference',
      },
      alt: 'Thumbnail',
    },
    author: 'John Doe',
    readingTime: 5,
    content: 'Blog post content here',
  }

  it('should map post document correctly', () => {
    const result = mapPost(mockPost)

    expect(result.id).toBe('post-1')
    expect(result.title).toBe('Test Blog Post')
    expect(result.excerpt).toBe('This is a test post')
    expect(result.slug).toBe('test-blog-post')
    expect(result.publishedDate).toBe('2024-01-15')
    expect(result.author).toBe('John Doe')
    expect(result.readingTime).toBe(5)
    expect(result.content).toBe('Blog post content here')
    expect(result.thumbnail).toBeDefined()
  })

  it('should handle post without thumbnail', () => {
    const postWithoutThumb = {
      ...mockPost,
      thumbnail: null,
    }

    const result = mapPost(postWithoutThumb)

    expect(result.thumbnail).toBeUndefined()
  })
})

describe('mapProject', () => {
  const mockProject: SanityProject = {
    _id: 'project-1',
    _type: 'project',
    title: 'Test Project',
    description: 'A test project',
    slug: { current: 'test-project', _type: 'slug' },
    thumbnail: {
      _type: 'image',
      asset: {
        _ref: 'image-proj',
        _type: 'reference',
      },
    },
    featured: true,
    technologies: ['React', 'TypeScript'],
    link: 'https://example.com',
    content: 'Project content',
    challenge: 'The challenge',
    solution: 'The solution',
    outcomes: 'Great outcomes',
    completionDate: '2024-01-20',
    clientName: 'Acme Corp',
  }

  it('should map project document correctly', () => {
    const result = mapProject(mockProject)

    expect(result.id).toBe('project-1')
    expect(result.title).toBe('Test Project')
    expect(result.description).toBe('A test project')
    expect(result.slug).toBe('test-project')
    expect(result.featured).toBe(true)
    expect(result.technologies).toEqual(['React', 'TypeScript'])
    expect(result.link).toBe('https://example.com')
    expect(result.completionDate).toBe('2024-01-20')
    expect(result.clientName).toBe('Acme Corp')
  })

  it('should handle project without optional fields', () => {
    const minimalProject: SanityProject = {
      _id: 'project-2',
      _type: 'project',
      title: 'Minimal Project',
      description: 'Description',
      slug: { current: 'minimal', _type: 'slug' },
      featured: false,
    }

    const result = mapProject(minimalProject)

    expect(result.title).toBe('Minimal Project')
    expect(result.technologies).toEqual([])
    expect(result.images).toBeUndefined()
    expect(result.thumbnail).toBeUndefined()
  })

  it('should filter out invalid images', () => {
    const projectWithImages: SanityProject = {
      ...mockProject,
      images: [
        {
          _type: 'image',
          asset: {
            _ref: 'image-1',
            _type: 'reference',
          },
        },
        null as any,
        {
          _type: 'image',
          asset: {
            _ref: 'image-2',
            _type: 'reference',
          },
        },
      ],
    }

    const result = mapProject(projectWithImages)

    expect(result.images).toHaveLength(2)
  })
})

describe('mapPosts', () => {
  it('should map an array of posts', () => {
    const posts: SanityPost[] = [
      {
        _id: 'post-1',
        _type: 'post',
        title: 'Post 1',
        excerpt: 'Excerpt 1',
        slug: { current: 'post-1', _type: 'slug' },
        publishedDate: '2024-01-01',
        author: 'Author 1',
        readingTime: 5,
        content: 'Content 1',
      },
      {
        _id: 'post-2',
        _type: 'post',
        title: 'Post 2',
        excerpt: 'Excerpt 2',
        slug: { current: 'post-2', _type: 'slug' },
        publishedDate: '2024-01-02',
        author: 'Author 2',
        readingTime: 3,
        content: 'Content 2',
      },
    ]

    const result = mapPosts(posts)

    expect(result).toHaveLength(2)
    expect(result[0].title).toBe('Post 1')
    expect(result[1].title).toBe('Post 2')
  })

  it('should handle empty array', () => {
    const result = mapPosts([])
    expect(result).toEqual([])
  })
})

describe('mapProjects', () => {
  it('should map an array of projects', () => {
    const projects: SanityProject[] = [
      {
        _id: 'project-1',
        _type: 'project',
        title: 'Project 1',
        description: 'Desc 1',
        slug: { current: 'project-1', _type: 'slug' },
        featured: true,
      },
      {
        _id: 'project-2',
        _type: 'project',
        title: 'Project 2',
        description: 'Desc 2',
        slug: { current: 'project-2', _type: 'slug' },
        featured: false,
      },
    ]

    const result = mapProjects(projects)

    expect(result).toHaveLength(2)
    expect(result[0].title).toBe('Project 1')
    expect(result[1].title).toBe('Project 2')
  })

  it('should handle empty array', () => {
    const result = mapProjects([])
    expect(result).toEqual([])
  })
})
