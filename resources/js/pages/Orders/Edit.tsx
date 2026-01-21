

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
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react"


import { CustomerForm } from '@/components/customers/CustomerForm'


import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


type Customer = {
    value: string
    label: string
}

type Props = {
    customers: Customer[]
    selectedCustomer: Customer | null
    onSelect: (customer: Customer) => void
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Order',
        href: '/orders/edit',
    },
];


export function CustomerSelection({ customers: initialCustomers, selectedCustomer, onSelect }: Props) {
    const [customers, setCustomers] = useState<Customer[]>(initialCustomers || [])
    const [openCustomer, setOpenCustomer] = useState(false)
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')

    const filteredCustomers = query
        ? customers.filter((c) =>
            c.label.toLowerCase().includes(query.toLowerCase())
        )
        : customers

    const loadCustomers = async () => {
        const res = await fetch('/api/customers')
        const data = await res.json()
        const mapped = data.map((c: any) => ({
            value: c.id,
            label: `${c.title?c.title:""} ${c.name} ${c.surname}`,
        }))
        setCustomers(mapped)
        return mapped
    }
    useEffect(() => {
        loadCustomers()
    }, [])

    return (
        <div className="flex space-x-2 items-start">

            <div className="flex-1 flex flex-col space-y-1">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {selectedCustomer?.label ?? 'Select customer'}
                            <ChevronDown className="ml-2 h-4 text-gray-400" />
                        </Button>
                    </PopoverTrigger>


                    <PopoverContent className="p-0 ml-2
                     w-[50vw]" side="bottom" align="start">
                        <Command>
                            <CommandInput
                                placeholder="Search customer..."
                                value={query}
                                onValueChange={setQuery}
                            />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {filteredCustomers.map((customer) => (
                                        <CommandItem
                                            key={customer.value}
                                            onSelect={() => {
                                                onSelect(customer)
                                                setOpen(false)
                                            }}
                                        >
                                            {customer.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <input
                    type="hidden"
                    name="customer_id"
                    value={selectedCustomer?.value ?? ''}
                />
            </div>
            <Popover open={openCustomer} onOpenChange={setOpenCustomer}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        className="add-button h-9 w-9 p-0 flex items-center justify-center"
                        aria-label="Add customer"
                    >
                        +
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    side="left"
                    align="start"
                    collisionPadding={16}
                    className="w-[50vw] max-h-[85vh] overflow-y-auto p-4"
                >
                    <CustomerForm
                        onSuccess={async () => {
                            // reload customers after new one is added
                            const updated = await loadCustomers()
                            // select the customer with the largest ID
                            const largest = updated.reduce((prev, curr) => curr.value > prev.value ? curr : prev, updated[0])
                            onSelect(largest)
                            setOpenCustomer(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

interface PageProps {
    order: Order
}



export default function Index() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

    const { order } = usePage<PageProps>().props

    const {data, setData, put, processing, errors } = useForm({
        orderID: order.orderID,
        productID: order.productID ?? '',
        transactionID: order.transactionID ?? '',
        price: order.price,
        wasPayed: order.wasPayed,
        description: order.description ?? '',
        customerID: order.customerID ?? '',

    });

    useEffect(() => {
        fetch('/api/customers')
            .then((res) => res.json())
            .then((data) => {
                const mapped = data.map((c: any) => ({
                    value: c.id,
                    label: `${c.title ?? ""} ${c.name} ${c.surname}`,
                }));
                setCustomers(mapped);

                // Set initial selectedCustomer based on order.customerID
                const initialCustomer = mapped.find(c => c.value === order.customerID);
                if (initialCustomer) {
                    setSelectedCustomer(initialCustomer);
                    setData('customerID', initialCustomer.value);
                }
            });
    }, [order.customerID]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('orders.update', order.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className='padding'>
                <Head title="Add Order" />

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
                        <Label htmlFor="Customer ID">Customer</Label>

                        <div className="flex w-full space-x-1">
                            <div className="flex-1">
                                <CustomerSelection
                                    customers={customers}
                                    selectedCustomer={selectedCustomer}
                                    onSelect={(customer) => {
                                        setSelectedCustomer(customer)
                                        setData('customerID', customer.value)
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="Order">Order ID</Label>
                            <Input
                                placeholder="XXXX-XXXX"
                                value={data.orderID}
                                onChange={(e) => setData('orderID', e.target.value)}
                            ></Input>
                        </div>

                        <div>
                            <Label htmlFor="Product ID">Product ID</Label>
                            <Input
                                placeholder="XXXX-XXXX"
                                value={data.productID}
                                onChange={(e) =>
                                    setData('productID', e.target.value)
                                }
                            ></Input>
                        </div>

                        <div>
                            <Label htmlFor="Transaction ID">Transaction ID</Label>
                            <Input
                                placeholder="XXXX-XXXX"
                                value={data.transactionID}
                                onChange={(e) =>
                                    setData('transactionID', e.target.value)
                                }
                            ></Input>
                        </div>

                        <div>
                            <Label htmlFor="Price">Order Price</Label>
                            <Input
                                placeholder="0,0 €"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                            ></Input>
                        </div>

                        <div>
                            <Label htmlFor="wasPayed">Was paid</Label>

                            <div className="mt-1">
                                <Checkbox
                                    checked={data.wasPayed}
                                    onCheckedChange={(checked) =>
                                        setData('wasPayed', Boolean(checked))
                                    }
                                />
                            </div>
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

                            <Link href="/orders">
                                <Button className="cancel-button m-2">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
                </div>
        </AppLayout>
);
}

