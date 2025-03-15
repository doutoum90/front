import { useCompetitors } from "../../hooks/useCompetitors";


export const Autres = () => {
    const { data: competitors } = useCompetitors();

    return (
        <div className="p-8">
            <h1 className="text-3xl mb-6">Veille Concurrentielle</h1>

            <CompetitorTable data={competitors} />

            <MarketTrendsChart />

            <AlertNotificationSystem />
        </div>
    );
};


const CompetitorTable = ({ data }: { data: any[] }) => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Liste des concurrents</h2>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="p-2 border border-gray-200">Nom</th>
                        <th className="p-2 border border-gray-200">URL</th>
                        <th className="p-2 border border-gray-200">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((competitor) => (
                        <tr key={competitor.id}>
                            <td className="p-2 border border-gray-200">{competitor.name}</td>
                            <td className="p-2 border border-gray-200">{competitor.url}</td>
                            <td className="p-2 border border-gray-200">
                                <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const MarketTrendsChart = () => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Graphique des tendances</h2>
            <div className="w-full h-64 bg-gray-100 rounded-md"></div>
        </div>
    );
};

const AlertNotificationSystem = () => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Système de notifications</h2>
            <div className="w-full h-64 bg-gray-100 rounded-md"></div>
        </div>
    );
};

export default Autres;