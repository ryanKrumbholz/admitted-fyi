
export const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between gap-2 text-sm md:gap-4 md:flex-row text-secondary">
      <div className="inline-flex items-center gap-1 text-sm">
        <span>Made with</span>

        <span>
          by{' '}
          <a
            href="https://planetscale.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors text-secondary hover:text-primary"
          >
            PlanetScale
          </a>
        </span>
      </div>
      <a
        href="https://github.com/planetscale/beam"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm transition-colors text-secondary hover:text-primary"
      >

        <span>View on GitHub</span>
      </a>
    </footer>
  )
}
