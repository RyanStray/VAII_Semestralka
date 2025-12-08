import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { ThumbsUp } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/orders',
    },
];

interface props{
    flash: {
        message?:string
    }
    orders: Orders[]
}

interface orders{
    id: number
    orderID: string
    productID: string
    transactionID: string
    price: number
    wasPayed: boolean
    description: string
}

export default function Index() {
    const {orders, flash} = usePage().props as props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />

            <div>
                {flash.message && (
                    <Alert>
                        <ThumbsUp />
                        <AlertTitle>{flash.message}</AlertTitle>
                    </Alert>
                )}
            </div>

            <div className='m-6'>
                <Link href="/orders/add"><Button className='nav-button'>Add new Order</Button></Link>
                <Button className='nav-button'>Edit Order</Button>
                <Button className='cancel-button'>Delete Order</Button>
            </div>
            <div className='m-2'>
                {orders.length > 0 && (
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Product ID</TableHead>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right w-[5px]">Was payed</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">INV001</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Credit Card</TableCell>
                                <TableCell className="text-right">$250.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                )}
            </div>
        </AppLayout>
    );
}
