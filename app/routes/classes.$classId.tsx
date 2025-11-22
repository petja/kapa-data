import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function() {
	const params = useParams()

	const { isPending, error, data } = useQuery({
		queryKey: ['repoData'],
		queryFn: () =>
			fetch(`/data/VehicleClass/${params.classId}.json`).then((res) =>
				res.json(),
			),
	})

	return <>
		<h1 className="text-lg font-medium">{params.classId}</h1>

		<pre>{JSON.stringify(data,null,2)}</pre>
	</>
}