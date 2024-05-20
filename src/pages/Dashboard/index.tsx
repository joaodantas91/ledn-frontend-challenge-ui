import { useEffect } from "react";
import { usePlanetList } from "../../data/queries";
import { Currency, Planet } from "../../types/Planet";
import './styles.css';

export default function Dashboard() {
    const { data: planets }: {data: Array<Planet>}= usePlanetList();

    const planetsByCurrency: {
        [key in Currency]: Array<{name: string, numberOfTransactions: number, id: string}>
    } = {
        [Currency.ICS]: [],
        [Currency.GCS]: [],
    }

    const transactionsQuantity = {
        total: 0,
        [Currency.ICS]: 0,
        [Currency.GCS]: 0,
    }

    for (let index = 0; index < planets?.length; index++) {
        const element = planets[index];
        
        planets[index].transactions.forEach(transaction => {
            const planetIndex = planetsByCurrency[transaction.currency].findIndex(planet => (
                planet.name === element.name
            ));

            if(planetIndex > -1) {
                const planet = planetsByCurrency[transaction.currency][planetIndex];
                planetsByCurrency[transaction.currency][planetIndex] = {
                    ...planet,
                    numberOfTransactions: planet.numberOfTransactions + 1
                }
            } else {
                planetsByCurrency[transaction.currency].push({
                    name: element.name,
                    numberOfTransactions: 1,
                    id: element.id
                })
            }

            transactionsQuantity[transaction.currency]++;
            transactionsQuantity.total++;
        });

        planetsByCurrency[Currency.ICS].sort(function(a, b) {
            return b.numberOfTransactions - a.numberOfTransactions;
        });

        planetsByCurrency[Currency.GCS].sort(function(a, b) {
            return b.numberOfTransactions - a.numberOfTransactions;
        });
    }

    return (
        <>
            <div className="top-three-wrapper">
                <section>
                    <h4>Top Three Planets by number of transaction using ICS</h4>
                    <ol>
                        {planetsByCurrency[Currency.ICS].slice(0, 3).map((item) => (
                            <li key={item.id}>{item.name} - {item.numberOfTransactions} transactions</li>
                        ))}
                    </ol>
                </section>
                
                <section>
                    <h4>Top Three Planets by number of transaction using GCS</h4>
                    <ol>
                        {planetsByCurrency[Currency.GCS].slice(0, 3).map((item) => (
                            <li key={item.id}>{item.name} - {item.numberOfTransactions} transactions</li>
                        ))}
                    </ol>
                </section>
            </div>
            

            <section className="total-transactions-section">
                <h4>Total of transactions</h4>
                <div className="total-transactions-bar">
                    <div style={{width: (transactionsQuantity[Currency.GCS] / transactionsQuantity.total) * 100 + '%'}}>
                        {transactionsQuantity[Currency.GCS]} {Currency.GCS}{' '}
                        ({((transactionsQuantity[Currency.GCS] / transactionsQuantity.total) * 100).toFixed(2)}%) 
                    </div>
                    <div style={{width: (transactionsQuantity[Currency.ICS] / transactionsQuantity.total) * 100 + '%'}}>
                        {transactionsQuantity[Currency.ICS]} {Currency.ICS}{' '}
                        ({((transactionsQuantity[Currency.ICS] / transactionsQuantity.total) * 100).toFixed(2)}%) 
                    </div>
                </div>
            </section>
        </>
    );
}