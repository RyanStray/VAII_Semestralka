import { useForm } from '@inertiajs/react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { TriangleAlert } from 'lucide-react'
import { route } from 'ziggy-js'

type Props = {
    onSuccess?: () => void
    showCancel?: boolean
}

export function CustomerForm({ onSuccess, showCancel = true }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        name: '',
        surname: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        description: '',
        companyID: 1, // change late this cant beee
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        post(route('customers.store'), {
            onSuccess: () => {
                onSuccess?.()
            },
        })
    }

    return (
        <div className="space-y-4">

            <div>Add new customer</div>
            <div>
                <Label>Title</Label>
                <Input
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
            </div>

            <div>
                <Label>Name</Label>
                <Input
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
            </div>

            <div>
                <Label>Surname</Label>
                <Input
                    value={data.surname}
                    onChange={(e) => setData('surname', e.target.value)}
                />
            </div>

            <div>
                <Label>Email</Label>
                <Input
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
            </div>

            <div>
                <Label>Phone</Label>
                <Input
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                />
            </div>

            <div>
                <Label>Company</Label>
                <Input
                    value={data.company}
                    onChange={(e) => setData('company', e.target.value)}
                />
            </div>

            <div>
                <Label>Position</Label>
                <Input
                    value={data.position}
                    onChange={(e) => setData('position', e.target.value)}
                />
            </div>

            <div>
                <Label>Description</Label>
                <Textarea
                    value={data.description}
                    onChange={(e) =>
                        setData('description', e.target.value)
                    }
                />
            </div>

            {Object.keys(errors).length > 0 && (
                <Alert>
                    <TriangleAlert />
                    <AlertTitle>Required field missing!</AlertTitle>
                    <AlertDescription>
                        <ul>
                            {Object.entries(errors).map(([key, message]) => (
                                <li key={key}>
                                    {message.replace(' i d ', ' ID ')}
                                </li>
                            ))}
                        </ul>
                    </AlertDescription>
                </Alert>
            )}

            <div className="flex gap-2">
                <Button className="save-button m-2" disabled={processing} onClick={handleSubmit}>Save</Button>

                {showCancel && (
                    <Button className="cancel-button m-2" type="button" variant="outline"
                            onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                )}
            </div>
        </div>
    )
}
