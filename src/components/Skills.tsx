import Image from 'next/image'
import type { Skills, TechItem, Certification } from '@/types/cms'

interface SkillsProps {
  skills: Skills
}

/**
 * Derive a Simple Icons CDN slug from a technology name.
 * Simple Icons slugs are lowercase with spaces/dots/special chars removed.
 * See: https://simpleicons.org/
 */
function toIconSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\+/g, 'plus')
    .replace(/\./g, 'dot')
    .replace(/[^a-z0-9]/g, '')
}

function TechBadge({ item }: { item: TechItem }) {
  const slug = item.iconSlug || toIconSlug(item.name)
  const iconUrl = `https://cdn.simpleicons.org/${slug}`

  const badge = (
    <span className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-800 dark:text-gray-200 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconUrl}
        alt=""
        aria-hidden="true"
        width={18}
        height={18}
        className="w-[18px] h-[18px] dark:invert"
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).style.display = 'none'
        }}
      />
      {item.name}
    </span>
  )

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg"
      >
        {badge}
      </a>
    )
  }

  return badge
}

function CertificationCard({ cert }: { cert: Certification }) {
  const issuerSlug = cert.issuerIconSlug || toIconSlug(cert.issuer)
  const issuerIconUrl = `https://cdn.simpleicons.org/${issuerSlug}`

  const formattedDate = cert.dateEarned
    ? new Date(cert.dateEarned).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })
    : null

  const isExpired = cert.expiryDate ? new Date(cert.expiryDate) < new Date() : false

  const card = (
    <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
      {/* Badge/image */}
      <div className="flex-shrink-0 w-12 h-12 relative">
        {cert.image ? (
          <Image
            src={cert.image.url}
            alt={cert.image.alt || cert.name}
            fill
            className="object-contain"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={issuerIconUrl}
            alt=""
            aria-hidden="true"
            width={48}
            height={48}
            className="w-12 h-12 dark:invert"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 dark:text-gray-100 leading-tight">
          {cert.name}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{cert.issuer}</p>
        {formattedDate && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Earned {formattedDate}
            {isExpired && (
              <span className="ml-2 text-amber-600 dark:text-amber-400">(Expired)</span>
            )}
          </p>
        )}
      </div>
    </div>
  )

  if (cert.link) {
    return (
      <a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-xl"
        aria-label={`View ${cert.name} certificate`}
      >
        {card}
      </a>
    )
  }

  return card
}

export default function Skills({ skills }: SkillsProps) {
  const hasTech = skills.techCategories.length > 0
  const hasCerts = skills.certifications.length > 0

  if (!hasTech && !hasCerts) {
    return null
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Skills & Certifications</h2>

        {hasTech && (
          <div className="mb-12">
            {skills.techCategories.map((category) => (
              <div key={category.name} className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((item) => (
                    <TechBadge key={item.name} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {hasCerts && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.certifications.map((cert) => (
                <CertificationCard key={cert.name} cert={cert} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
