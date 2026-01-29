interface AboutProps {
  bio: string
}

export default function About({ bio }: AboutProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center">
          {bio}
        </p>
      </div>
    </section>
  )
}
