import { useParams } from "react-router-dom";
import { usePlanetDetail } from "../../data/queries";
import { TransactionStatus } from "../../types/Planet";
import './styles.css';

export default function  Planet() {
    const params = useParams();
    const { data: detail } = usePlanetDetail(params.id || '');

    const classByStatus = {
        [TransactionStatus.Blocked]: "status--blocked",
        [TransactionStatus.InProgress]: "status--in-progress",
        [TransactionStatus.Completed]: "status--completed",
    }

    const status = {
        [TransactionStatus.Blocked]: "Blocked",
        [TransactionStatus.InProgress]: "In progress",
        [TransactionStatus.Completed]: "Completed",
    }

    return (
        <>
            <h2>Planet {detail?.name}</h2>
            <section className="planet-details">
                <p><strong>Climate:</strong> {detail?.climate}</p>
                <p><strong>Diameter:</strong> {detail?.diameter}</p>
                <p><strong>Gravity:</strong> {detail?.gravity}</p>
                <p><strong>Orbital Period:</strong> {detail?.orbital_period}</p>
                <p><strong>Population:</strong> {detail?.population}</p>
                <p><strong>Residents:</strong> {detail?.residents.length}</p>
                <p><strong>Rotate Period:</strong> {detail?.rotation_period}</p>
                <p><strong>Surface water:</strong> {detail?.surface_water}</p>
                <p><strong>Terrain:</strong> {detail?.terrain}</p>
            </section>
            

            <h3>Transactions</h3>

            <table className="tables-planet-details">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User Id</th>
                        <th>User name</th>
                        <th>Currency</th>
                        <th>Amount</th>
                        <th>Status</th>
                        
                    </tr>
                </thead>
                {detail?.transactions?.map((item) => (
                    <tr>
                        <td>{new Date(item.date).toLocaleString()}</td>
                        <td>{item.user}</td>
                        <td>{detail?.residents.find(resident => resident.id === item.user)?.name || 'user name not found'}</td>
                        <td>{item.currency}</td>
                        <td>{item.amount}</td>
                        <td className={"status " + classByStatus[item.status]}>
                            <span>{status[item.status]}</span>
                        </td>
                    </tr>
                ))}
                
            </table>
            {detail?.transactions && detail?.transactions?.length < 1 && 
                <h4>There are no transactions</h4>
            }
        </>
    );
}