
import Card from "./card"
import MostTreesTop from "./most-tees-top"

export default function MostTreesTable() {
    return (
        <div className="w-full lg:w-1/2 flex flex-col mt-10">
            <MostTreesTop />
            {
                Array(5).fill(0).map(l => {
                    return (
                        <Card />
                    )
                })
            }
        </div>
    )
}