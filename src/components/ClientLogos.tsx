import Image from 'next/image'
import type { ClientLogos } from '@/types/cms'

interface ClientLogosProps {
  clientLogos: ClientLogos
}

export default function ClientLogos({ clientLogos }: ClientLogosProps) {
  if (clientLogos.clients.length === 0) {
    return null
  }

  return (
    <section id="clients" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Clients</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
          {clientLogos.clients.map((client) => {
            const logo = (
              <div className="relative w-32 h-16 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
                <Image
                  src={client.logo.url}
                  alt={client.logo.alt || client.name}
                  fill
                  className="object-contain"
                />
              </div>
            )

            if (client.url) {
              return (
                <a
                  key={client.name}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${client.name}`}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded"
                >
                  {logo}
                </a>
              )
            }

            return (
              <div key={client.name} aria-label={client.name}>
                {logo}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
