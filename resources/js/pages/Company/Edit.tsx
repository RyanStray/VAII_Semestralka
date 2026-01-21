
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert, Building } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add Company',
        href: '/company/add',
    },
];

interface PageProps {
    companies: Companies
}

export default function Index() {

    const { companies } = usePage<PageProps>().props

    const {data, setData, put, processing, errors } = useForm({
        name: companies.name,
        address: companies.address ?? '',
        contact: companies.contact ?? '',

        description: companies.description ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('company.update', companies.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Company" />

            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <TriangleAlert />
                            <AlertTitle>Required field missing!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(
                                        ([key, message]) => (
                                            <li key={key}>
                                                {message.replace(
                                                    ' i d ',
                                                    ' ID ',
                                                )}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="flex h-32 items-center justify-center">
                        <Building className="text-700" size={64} />
                    </div>

                    <div>
                        <Label htmlFor="Name">Company Name</Label>
                        <Input
                            placeholder="Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        ></Input>
                    </div>

                    <div>
                        <Label htmlFor="Contact">Contact</Label>
                        <Input
                            placeholder="Contact"
                            value={data.contact}
                            onChange={(e) => setData('contact', e.target.value)}
                        ></Input>
                    </div>

                    <div>
                        <Label htmlFor="Address">Address</Label>
                        <Input
                            placeholder="Address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                        ></Input>
                    </div>
                    <div>
                        <Label htmlFor="Description">Description</Label>
                        <Textarea
                            placeholder="Description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        ></Textarea>
                    </div>
                    <div className="space-x-1">
                        <Button className="save-button m-2">Save</Button>

                        <Link href="/company">
                            <Button className="cancel-button m-2">
                                Cancel
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
