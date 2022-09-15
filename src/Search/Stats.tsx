import { useConnector } from "react-instantsearch-hooks-web";
import connectStats from "instantsearch.js/es/connectors/stats/connectStats";

import type {
    StatsConnectorParams,
    StatsWidgetDescription,
} from "instantsearch.js/es/connectors/stats/connectStats";

export type UseStatsProps = StatsConnectorParams;

export function useStats(props?: UseStatsProps) {
    return useConnector<StatsConnectorParams, StatsWidgetDescription>(
        connectStats,
        props
    );
}

export function Stats(props: UseStatsProps) {
    const {
        hitsPerPage,
        nbHits,
        areHitsSorted,
        nbSortedHits,
        nbPages,
        page,
        processingTimeMS,
        query,
    } = useStats(props);

    return (
        <>
            <div style={{ fontSize: "0.8rem" }}>
                查询到 {nbHits} 记录，用时 {processingTimeMS}ms
            </div>
        </>
    );
}
