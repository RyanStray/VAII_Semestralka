type Company = {
    value: number
    label: string
}

type Props = {
    companies: Company[]
    selectedCompany: Company | null
    onSelect: (company: Company) => void
}

export function CompanySwitcher({ companies, selectedCompany, onSelect }: Props) {
    return (
        <select
            className="w-full border rounded px-2 py-1"
            value={selectedCompany?.value ?? ''}
            onChange={(e) => {
                const company = companies.find(
                    (c) => c.value === Number(e.target.value)
                )
                if (company) onSelect(company)
            }}
        >
            <option value="">Select company</option>
            {companies.map((company) => (
                <option key={company.value} value={company.value}>
                    {company.label}
                </option>
            ))}
        </select>
    )
}
