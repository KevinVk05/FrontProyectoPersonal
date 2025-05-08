export function filtrarPorSupermercado(){
    const establecimiento = document.getElementById("selectSupermercado").value
    setResultados(resultadosCompleto)
    if(establecimiento !== "Todos los supermercados"){
      setResultados(resultadosCompleto.filter(prod => prod.supermercado === establecimiento.toUpperCase()))     
    }
}