import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { ThumbsUp, Building } from 'lucide-react';
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
        title: 'Company',
        href: '/company',
    },
];

interface props{
    flash: {
        message?:string
    }
    companies: Companies[]
}

interface Companies{
    id: number
    name: string,
    address: string,
    contact: string
    description: string,
};

export default function Index() {

    const {processing, delete: destroy } = useForm();

    const handleDelete= (id: number, surname: string) => {
        if (confirm("Are you sure you want to remove : " + name + " company? All of its existing data will be lost?")) {
            if (confirm("This action cannot be taken back, are you sure you want to delete?")) {
                destroy('/companies/delete/' + id);
            }
        }
    }

    const {companies, flash} = usePage().props as props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className='padding'>
                <Head title="Companies" />

                <div>
                    {flash.message && (
                        <Alert>
                            <ThumbsUp />
                            <AlertTitle>{flash.message}</AlertTitle>
                        </Alert>
                    )}
                </div>

                <div className='m-6'>
                    <Link href={route('company.add')}><Button className='nav-button'>Add new Company</Button></Link>
                </div>
                <div className='m-2'>
                    {companies.length > 0 && (
                        <Table>
                            <TableCaption>A list of your Companies.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>Description</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {companies.map((companies) => (
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <Building />
                                        </TableCell>

                                        <TableCell>{companies.name}</TableCell>
                                        <TableCell>{companies.contact}</TableCell>
                                        <TableCell>{companies.address}</TableCell>
                                        <TableCell>{companies.description}</TableCell>
                                        <TableCell className='space-x-1'>
                                            <Link href={route('company.edit', companies.id)}><Button
                                                className='nav-button'>Edit</Button></Link>
                                        </TableCell>
                                        <TableCell><Button disabled={processing}
                                                           onClick={() => handleDelete(companies.id, companies.name)}
                                                           className='delete-button'>Delete</Button></TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    )}
                </div>
                </div>
        </AppLayout>
);
}
