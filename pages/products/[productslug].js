import Head from 'next/head';

import styles from '../../styles/SingleProduct.module.css';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const singleproduct = ({ product }) => {
	return (
		<>
			<Head>
				<title>{product.name}</title>
			</Head>
			<div className={styles.single_container}>
				<div className={styles.left_section}>
					<img src={product.image.url} className={styles.left_img} alt="" />
				</div>
				<div className={styles.right_section}>
					<h3 className={styles.title}>{product.name}</h3>
					<p className={styles.price}>${product.price}</p>
					<div
						className={styles.para}
						dangerouslySetInnerHTML={{
							__html: product.description.html,
						}}
					></div>
					<button
						className="btn snipcart-add-item"
						data-item-id={product.id}
						data-item-price={product.price}
						data-item-url={`products/${product.slug}`}
						data-item-image={product.image.url}
						data-item-name={product.name}
					>
						Add to cart 🛒
					</button>
				</div>
			</div>
		</>
	);
};

export default singleproduct;

export async function getStaticProps({ params }) {
	const client = new ApolloClient({
		uri: 'https://api-us-east-1.graphcms.com/v2/cl2cupjxo4izz01z8fcm26gxf/master',
		cache: new InMemoryCache(),
	});

	const data = await client.query({
		query: gql`
			query MyQuery($slug: String) {
				product(where: { slug: $slug }) {
					id
					name
					price
					slug
					description {
						html
					}
					image {
						url
					}
				}
			}
		`,
		variables: {
			slug: params.productslug,
		},
	});

	const product = data.data.product;

	return {
		props: {
			product,
		},
	};
}

export async function getStaticPaths() {
	const client = new ApolloClient({
		uri: 'https://api-us-east-1.graphcms.com/v2/cl2cupjxo4izz01z8fcm26gxf/master',
		cache: new InMemoryCache(),
	});

	const data = await client.query({
		query: gql`
			query ProductsQuery {
				products {
					id
					name
					slug
					price
					image {
						url
					}
				}
			}
		`,
	});

	const paths = data.data.products.map((singleProduct) => {
		return {
			params: {
				productslug: singleProduct.slug,
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
}
