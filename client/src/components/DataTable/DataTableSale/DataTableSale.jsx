import { Avatar, Text, ActionIcon, Group } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { formatPrice } from '../../../utils/formatPrice';
import { useDispatch } from 'react-redux';
import { deleteItem, ModifyQuantity } from '../../../redux/slices/saleSlice';
import { ButtonActions } from '../..';
import { useGetProductsQuery } from '../../../redux/apis/productsApi';

const btn = {
	fontSize: '1rem ',
	border: '1px solid',
	borderRadius: '50%',
	width: '20px',
	height: '20px',
	textAlign: 'center',
	lineHeight: '15px',
};

export const DataTableSale = ({ records, onClick }) => {
	const [data, setData] = useState();
	const dispatch = useDispatch();
	const {
		data: { products },
	} = useGetProductsQuery();

	useEffect(() => {
		setData(records);
	}, [records]);
	return (
		<>
			<DataTable
				withColumnBorders
				highlightOnHover
				noRecordsIcon=' '
				noRecordsText=''
				records={data}
				onRowClick={onClick}
				idAccessor='barcode'
				columns={[
					{
						accessor: 'barcode',
						title: 'Código',
						textAlignment: 'center',
						width: '10%',
						visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.lg}px)`,
					},
					{
						accessor: 'photoURL',
						title: '',
						textAlignment: 'center',
						width: '2%',
						render: ({ photoURL }) => <Avatar src={photoURL} />,
					},
					{
						accessor: 'description',
						title: 'Descripción',
						ellipsis: true,
						width: '30%',
						titleStyle: { textAlign: 'center' },
						visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.sm}px)`,
					},
					{
						accessor: 'price',
						title: 'Precio',
						textAlignment: 'right',
						titleStyle: { textAlign: 'center' },
						width: '7%',
						visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.md}px)`,
						render: ({ price }) => <Text>{formatPrice(price)}</Text>,
					},
					{
						accessor: 'quantity',
						title: 'Cantidad',
						textAlignment: 'center',
						width: '15%',
						render: ({ barcode, quantity, price }) => (
							<Group sx={{ justifyContent: 'space-between' }}>
								<ActionIcon
									color='pink'
									onClick={async (e) => {
										quantity > 1 &&
											dispatch(ModifyQuantity({ barcode, quantity: +quantity - 1, price }));
									}}>
									<Text sx={btn}>-</Text>
								</ActionIcon>
								<Text>{quantity}</Text>
								<ActionIcon
									color='teal'
									onClick={async (e) => {
										const { stock } = products.find((product) => product.barcode === barcode);
										stock > quantity &&
											dispatch(ModifyQuantity({ barcode, quantity: +quantity + 1, price }));
									}}>
									<Text sx={btn}>+</Text>
								</ActionIcon>
							</Group>
						),
					},
					{
						accessor: 'subTotal',
						title: 'subTotal',
						textAlignment: 'right',
						titleStyle: { textAlign: 'center' },
						width: '8%',
						render: ({ subTotal }) => <Text>{formatPrice(subTotal)}</Text>,
					},
					{
						accessor: 'actions',
						title: '',
						textAlignment: 'center',
						width: '1%',
						render: (product) => (
							<ButtonActions
								label='Eliminar producto'
								isEdit={false}
								action={() => dispatch(deleteItem(product.barcode))}
							/>
						),
					},
				]}
			/>
		</>
	);
};
