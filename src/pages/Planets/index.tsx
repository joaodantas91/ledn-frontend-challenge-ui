import { Link } from "react-router-dom";
import { usePlanetList } from "../../data/queries";
import Fuse, { FuseResult } from 'fuse.js'
import { useEffect, useState } from "react";
import { Currency, Planet } from "../../types/Planet";

enum OrderTypes {
    none = "none",
    ascendant = "asc",
    descendant = "desc"
}

export default function Planets() {
    const searchIcons = {
        [OrderTypes.none]: <svg xmlns="http://www.w3.org/2000/svg" fill="rgba(157,233,250,1)" width={16} viewBox="0 0 320 512"><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>,
        [OrderTypes.ascendant]: <svg xmlns="http://www.w3.org/2000/svg" fill="rgba(157,233,250,1)" viewBox="0 0 320 512" width={16}><path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>,
        [OrderTypes.descendant]:  <svg xmlns="http://www.w3.org/2000/svg" fill="rgba(157,233,250,1)" viewBox="0 0 320 512"width={16} ><path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"/></svg>

    }

    const [searchedPlanets, setSearchedPlanets] = useState<FuseResult<Planet>[]>([]);
    
    const orderTypes = [OrderTypes.none, OrderTypes.ascendant, OrderTypes.descendant];
    const [currencyFilter, setCurrencyFilter] = useState<Currency | null>(null);
    const [planets, setPlanets] = useState<Planet[]>([]);
    const [sortedPlanets, setSortedPlanets] = useState<Planet[]>([]);
    const [nameOrder, setNameOrder] = useState(orderTypes[0]);
    const { data: list }: {data: Array<Planet>}= usePlanetList();

    const fuse = new Fuse(list, {
        includeScore: true,
        keys: ["name"]
    })

    useEffect(() => {
        let planets = (() => {
            if (searchedPlanets.length > 0) {
                return searchedPlanets.map(planet => planet.item);
            }
            return list;
        })()
        if(!!currencyFilter && currencyFilter.length > 0) {
            planets = planets.filter(planet => {
                return planet.transactions.some(transaction => transaction.currency === currencyFilter)
            })
        }

        setPlanets(planets)
    }, [searchedPlanets, list, currencyFilter]);

    useEffect(() => {
        if(planets?.length > 0) {

            const sortedPlanets = [...planets];

            if(nameOrder !== OrderTypes.none) {
                sortedPlanets.sort((a, b) => {
                    const comparison = a.name.localeCompare(b.name);
                    return nameOrder === OrderTypes.ascendant ? comparison : -comparison;
                });
            }
            
            setSortedPlanets(sortedPlanets);
        }
    }, [nameOrder, planets]);


    
    return (
        <>
            <div>
                <label htmlFor="search-planet">
                    Search by Name: 
                </label>
                {' '}
                <input 
                    name="search-planet"
                    type="text" 
                    onChange={(e)=> {
                        setSearchedPlanets(fuse.search(e.target.value))
                }} />
                {' '}
                <label htmlFor="currency-filter">
                    Filter by currency: 
                </label>
                {' '}
                <select name="currency-filter" id="" onChange={(e) => {
                    setCurrencyFilter(e.target.value.length > 0 ? e.target.value as Currency : null)
                }}>
                    <option value={''}>none</option>
                    <option value={Currency.GCS}>{Currency.GCS}</option>
                    <option value={Currency.ICS}>{Currency.ICS}</option>
                </select>
            </div>
            <div className="table-wrapper">
                <table className="planets">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>
                                <button type="button" onClick={() => {
                                    // setNameOrder(prev => (
                                    //     orderTypes.indexOf(prev) === orderTypes.length - 1 ? orderTypes[0] : orderTypes[orderTypes.indexOf(prev) + 1]
                                    // ))
                                    setNameOrder(prev => orderTypes[(orderTypes.indexOf(prev) + 1) % orderTypes.length]);
                                }}>
                                    Name {searchIcons[nameOrder]}
                                </button>
                            </th>
                            <th>Residents</th>
                            <th>Transactions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedPlanets?.map((planet) => (
                            <tr key={planet.id}>
                                <td>{planet.id}</td>
                                <td>{planet.name}</td>
                                <td>{planet.residents?.length}{' resident' + (planet.residents?.length === 1 ? '' : 's')}</td>
                                <td>{planet.transactions?.length}{' transaction' + (planet.transactions?.length === 1 ? '' : 's')}</td>
                                <td>
                                    <Link to={'/planets/' + planet.id}>
                                        <img src="/arrow-right-solid.svg" width={20}/>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}