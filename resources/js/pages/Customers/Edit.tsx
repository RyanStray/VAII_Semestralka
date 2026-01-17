
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { TriangleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Customer',
        href: '/customers/edit',
    },
];

interface Customer{
    id: number

    title: string
    name: string
    surname: string

    email: string
    phone: string

    company: string
    position: string

    description: string

}

interface PageProps {
    customer: Customer
}

export default function Index() {

    const { customer } = usePage().props as { customer: Customer }

    const {data, setData, put, processing, errors } = useForm({
        title: customer.title ?? '',
        name: customer.name,
        surname: customer.surname,

        email: customer.email ?? '',
        phone: customer.phone ?? '',

        company: customer.company ?? '',
        position: customer.position ?? '',

        description: customer.description ?? ''});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('customers.update', customer.id));
    };

    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Customer" />

            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">

                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <TriangleAlert />
                            <AlertTitle>Required field missing!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message.replace(" i d ", " ID ")}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div>
                        <Label htmlFor="Title">Title</Label>
                        <Input placeholder="Title" value={data.title}
                               onChange={(e) => setData('title', e.target.value)}></Input>
                    </div>

                    <div>
                        <Label htmlFor="Name">Name</Label>
                        <Input placeholder="Name" value={data.name}
                               onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>

                    <div>
                        <Label htmlFor="Surname">Surname</Label>
                        <Input placeholder="Surname" value={data.surname}
                               onChange={(e) => setData('surname', e.target.value)}></Input>
                    </div>

                    <div>
                        <Label htmlFor="Email">Email</Label>
                        <Input placeholder="Email" value={data.email}
                               onChange={(e) => setData('email', e.target.value)}></Input>
                    </div>
                    <div>
                        <Label htmlFor="Phone">Phone</Label>
                        <Input placeholder="Phone" value={data.phone}
                               onChange={(e) => setData('phone', e.target.value)}></Input>
                    </div>

                    <div>
                        <Label htmlFor="Company">Company</Label>
                        <Input placeholder="Company" value={data.company}
                               onChange={(e) => setData('company', e.target.value)}></Input>
                    </div>
                    <div>
                        <Label htmlFor="Position">Position</Label>
                        <Input placeholder="Position" value={data.position}
                               onChange={(e) => setData('position', e.target.value)}></Input>
                    </div>

                    <div>
                        <Label htmlFor="Description">Description</Label>
                        <Textarea placeholder="Description" value={data.description}
                                  onChange={(e) => setData('description', e.target.value)}></Textarea>
                    </div>
                    <div className='space-x-1'>
                        <Button className="save-button m-2">Save</Button>

                        <Link href="/customers"><Button className="cancel-button m-2">Cancel</Button></Link>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
}
