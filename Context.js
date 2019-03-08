import React from "react";

export const state = {
	dataset: [
				{
					id: 1,
					product: 'Apple iPhone 6s',
					color: 'Stonegrey',
					price: 'CHF 769'
				},
				{
					id: 2,
					product: 'Samsung Galaxy S8',
					color: 'Midnight Black',
					price: 'CHF 569'
				},
				{
					id: 3,
					product: 'Huawei P9',
					color: 'Mystic Silver',
					price: 'CHF 272'
				}
			],
	dicts: [
			{
				id: 1,
				name: 'dict1',
				dict: [
							{
								id: 1, 
								domain: 'Stonegrey',
								range: 'Dark Grey'
							},
							{
								id: 2, 
								domain: 'Mystic Silver',
								range: 'Silver'
							}
						]
			},
			{
				id: 2,
				name: 'dict2',
				dict: [
							{
								id: 1, 
								domain: 'Midnight Black',
								range: 'Black'
							},
							{
								id: 2, 
								domain: 'Stonegrey',
								range: 'Dark Grey'
							}
						]
			}
			]
};

export const ContextData = React.createContext(state);
