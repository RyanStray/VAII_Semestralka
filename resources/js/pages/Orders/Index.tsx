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

interface Orders{
    id: number
    orderID: string
    productID: string
    transactionID: string
    price: number
    wasPayed: boolean
    description: string
}

export default function Index() {

    const {processing, delete: destroy } = useForm();

    const handleDelete= (id: number, orderID: String) => {
        if (confirm("Are you sure you want to delete order: " + orderID + "?")) {
            //destroy(route('orders.delete', id));
            destroy('/orders/delete/' + id);
        }
    }

    const {orders, flash} = usePage().props as props;
    //let selectedLine: number = 0;

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
                <Link href={route('orders.add')}><Button className='nav-button'>Add new Order</Button></Link>
                {/*<Link href="/orders/add"><Button className='nav-button'>Add new Order</Button></Link>*/}
                {/*<Button className='nav-button'>Edit Order</Button>
                <Button className='delete-button' onClick={(e) => handleDelete(e, selectedLine)}>Delete Order</Button>*/}
            </div>
            <div className='m-2'>
                {orders.length > 0 && (
                    <Table>
                        <TableCaption>A list of your Orders.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Product ID</TableHead>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right w-[5px]">Was payed</TableHead>
                                <TableHead></TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow >
                                          {/*onClick=() => selectedLine === order.id*/}
                                    <TableCell className="font-medium">{order.id}.</TableCell>

                                    <TableCell>{order.orderID}</TableCell>
                                    <TableCell>{order.productID}</TableCell>
                                    <TableCell>{order.transactionID}</TableCell>

                                    <TableCell>{order.price}€</TableCell>
                                    <TableCell>{order.description}</TableCell>
                                    <TableCell className="text-right">{order.wasPayed  ?  'yes' : 'no'}</TableCell>
                                    <TableCell className='space-x-1'>
                                        <Link href = {route('orders.edit', order.id)}><Button className='nav-button'>Edit</Button></Link>
                                    </TableCell>
                                    <TableCell><Button disabled={processing} onClick={() => handleDelete(order.id, order.orderID)} className='delete-button'>Delete</Button></TableCell>
                                </TableRow >
                            ))}

                        </TableBody>
                    </Table>
                )}
            </div>
        </AppLayout>
    );
}
