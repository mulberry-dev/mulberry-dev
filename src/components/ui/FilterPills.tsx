"use client"

import { CategoryIcon } from "@/components/ui/CategoryIcon"

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
        className={`ui-filter-pill ui-filter-pill--${option.id}${active === option.id ? " is-active" : ""}`}
        onClick={() => onChange(option.id)}
      >
        <CategoryIcon variant={option.id} />
        {option.label}
      </button>
    )}
  </div>

export default FilterPills
