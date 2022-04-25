import Image from 'next/image';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const singleproduct = ({ product }) => {
	return (
		<div className="container single-container">
			<div className="left-section">
				<Image src={product.image.url} width={300} height={700} alt="" />
			</div>
			<div className="right-section">
				<h3>{product.name}</h3>
				<p className="price">${product.price}</p>
				<div
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
