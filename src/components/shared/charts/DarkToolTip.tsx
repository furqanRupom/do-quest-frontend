
export const DarkTooltip = (
  { active, payload, label }: any
) => {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 shadow-md">
      <p className="text-xs text-zinc-400 mb-1">
        {String(label)}
      </p>

      {payload.map((item: any, index: number) => (
        <p key={index} className="text-sm text-white">
          <span style={{ color: item.color }}>
            {item.name}:
          </span>{" "}
          {item.value}
        </p>
      ))}
    </div>
  )
}
