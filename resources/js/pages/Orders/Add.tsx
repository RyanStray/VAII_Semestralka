
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
        title: 'Add Order',
        href: '/orders/add',
    },
];

export default function Index() {
    const {data, setData, post, processing, errors } = useForm({
        orderID: "",
        productID: "",
        transactionID: "",
        price: "",
        //wasPayed: false,
        description: ""});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('orders.store'));
        //console.log("1");
        //console.log(data); //Save data
    };

    return (

        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Order" />

            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">

                    {Object.keys(errors).length > 0 &&(
                        <Alert>
                            <TriangleAlert />
                            <AlertTitle>Required field missing!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key = {key}>{message}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div>
                        <Label htmlFor="Order">Order ID</Label>
                        <Input placeholder="XXX" value={data.orderID}
                               onChange={(e) => setData('orderID', e.target.value)}></Input>
                    </div>

                    <div>
                        <Label htmlFor="Product ID">Product ID</Label>
                        <Input placeholder="XXX" value={data.productID}
                               onChange={(e) => setData('productID', e.target.value)}></Input>
                    </div>

                    <div>
                        <Label htmlFor="Transaction ID">Transaction ID</Label>
                        <Input placeholder="XXX" value={data.transactionID}
                               onChange={(e) => setData('transactionID', e.target.value)}></Input>
                    </div>

                    <div>
                        <Label htmlFor="Price">Order Price</Label>
                        <Input placeholder="0,0€" value={data.price}
                               onChange={(e) => setData('price', e.target.value)}></Input>
                    </div>

                    <div>
                        <Label htmlFor="Was payed">Was payed</Label>

                        <div className="m-1"><Checkbox defaultChecked={data.wasPayed}
                                                       onChange={(e) => setData('wasPayed', e.target.value)}></Checkbox>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="Description">Description</Label>
                        <Textarea placeholder="Description" value={data.description}
                                  onChange={(e) => setData('description', e.target.value)}></Textarea>
                    </div>

                    <Button className="m-2" type="submit" class="save-button">Save</Button>

                    <Link href="/orders"><Button className="m-2" class="cancel-button" >Cancel</Button></Link>

                </form>
            </div>
        </AppLayout>
    );
}
