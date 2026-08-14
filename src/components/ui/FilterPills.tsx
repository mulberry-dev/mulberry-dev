"use client"

export type FilterOption = {
  id: string
  label: string
}

const FilterPills = ({
  options,
  active,
  onChange
}: {
  options: FilterOption[]
  active: string
  onChange: (id: string) => void
}) =>
  <div className="ui-filter-pills" role="tablist">
    {options.map(option =>
      <button
        key={option.id}
        type="button"
        role="tab"
        aria-selected={active === option.id}
        className={`ui-filter-pill${active === option.id ? " is-active" : ""}`}
        onClick={() => onChange(option.id)}
      >
        {option.label}
      </button>
    )}
  </div>

export default FilterPills
