
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
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
        title: 'Add Customer',
        href: '/customers/add',
    },
];

export default function Index() {
    const {data, setData, post, processing, errors } = useForm({
        id: "",
        name: "",
        surename: "",
        description: ""});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('customers.store'));
        //console.log("1");
        //console.log(data); //Save data
    };

    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Customer" />

            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">

                    {Object.keys(errors).length > 0 &&(
                        <Alert>
                            <TriangleAlert />
                            <AlertTitle>Required field missing!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key = {key}>{message.replace(" i d ", " ID ")}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div>
                        <Label htmlFor="Customer">Name</Label>
                        <Input placeholder="XXX" value={data.name}
                               onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>

                    <div>
                        <Label htmlFor="Surename">Surename</Label>
                        <Input placeholder="XXX" value={data.surename}
                               onChange={(e) => setData('surename', e.target.value)}></Input>
                    </div>

                    <div>
                        <Label htmlFor="Description">Description</Label>
                        <Textarea placeholder="Description" value={data.description}
                                  onChange={(e) => setData('description', e.target.value)}></Textarea>
                    </div>
                    <div className='space-x-1'>
                        <Button className="save-button m-2">Save</Button>

                        <Link href="/customers"><Button className="cancel-button m-2" >Cancel</Button></Link>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
}
