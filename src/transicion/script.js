export function eliminarProductoConTransicion (supermercado, productoIndex, element) {

	console.log(element)
	if (!element) {
		console.log("hola")
		return
	}

	if (!document.startViewTransition) {
		eliminarProducto(supermercado, productoIndex);
		return;
	}

	element.style.viewTransitionName = 'targeted-card';

	document.startViewTransition(() => {
		eliminarProducto(supermercado, productoIndex);
	});
};

const eliminarProducto = (supermercado, productoIndex) => {
	setProductosPorSuper(prev => {
		const nuevos = { ...prev };
		nuevos[supermercado] = [...nuevos[supermercado]];
		nuevos[supermercado].splice(productoIndex, 1);
		return nuevos;
	});
};
