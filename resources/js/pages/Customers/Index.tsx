import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { ThumbsUp  } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Customers',
        href: '/customers',
    },
];

interface props{
    flash: {
        message?:string
    }
    customers: Customers[]
}

interface Customers{
    id: number
    title: string,
    name: string,
    surname: string,

    email: string,
    phone: string,

    company: string,
    position: string,

    description: string};

export default function Index() {

    const {processing, delete: destroy } = useForm();

    const handleDelete= (id: number, surname: string) => {
        if (confirm("Are you sure you want to remove customer: " + surname + "?")) {
            destroy('/customers/delete/' + id);
        }
    }

    const {customers, flash} = usePage().props as props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />

            <div>
                {flash.message && (
                    <Alert>
                        <ThumbsUp />
                        <AlertTitle>{flash.message}</AlertTitle>
                    </Alert>
                )}
            </div>

            <div className='m-6'>
                <Link href={route('customers.add')}><Button className='nav-button'>Add new Customer</Button></Link>
            </div>
            <div className='m-2'>
                {customers.length > 0 && (
                    <Table>
                        <TableCaption>A list of your Customers.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>email</TableHead>
                                <TableHead>phone</TableHead>
                                <TableHead>company</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customers) => (
                                <TableRow >
                                    <TableCell className="font-medium">{customers.id}.</TableCell>

                                    <TableCell>{customers.title + " " +  customers.name + " " + customers.surname}</TableCell>
                                    <TableCell>{customers.email}</TableCell>
                                    <TableCell>{customers.phone}</TableCell>
                                    <TableCell>{customers.company}</TableCell>
                                    <TableCell className='space-x-1'>
                                        <Link href = {route('customers.edit', customers.id)}><Button className='nav-button'>Edit</Button></Link>
                                    </TableCell>
                                    <TableCell><Button disabled={processing} onClick={() => handleDelete(customers.id, customers.name +  " " + customers.surname)} className='delete-button'>Delete</Button></TableCell>
                                </TableRow >
                            ))}

                        </TableBody>
                    </Table>
                )}
            </div>
        </AppLayout>
    );
}

