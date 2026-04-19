"use client"

const ERRORS = [
  { code: "200", meaning: "Success", description: "The request was successful." },
  { code: "400", meaning: "Bad Request", description: "Parameters were invalid or missing." },
  { code: "401", meaning: "Unauthorized", description: "No valid API key provided." },
  { code: "500", meaning: "Server Error", description: "Something went wrong on our end." },
]

export function ErrorTable() {
  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-[118px_1fr_2fr] border-b border-surface-3 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-muted">
        <span className="text-center">Code</span>
        <span>Meaning</span>
        <span>Description</span>
      </div>
      {ERRORS.map((error) => (
        <div
          key={error.code}
          className="grid grid-cols-[118px_1fr_2fr] items-center border-b border-surface-3 bg-white px-6 py-4 font-primary text-sm last:border-b-0"
        >
          <span
            className={`text-center font-black ${
              error.code === "200" ? "text-[#466B48]" : "text-status-danger"
            }`}
          >
            {error.code}
          </span>
          <span className="font-bold text-text-primary">{error.meaning}</span>
          <span className="font-medium text-text-secondary">
            {error.description}
          </span>
        </div>
      ))}
    </div>
  )
}
