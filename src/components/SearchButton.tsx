import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const SearchButton = () => {
    return (
        <>
            <div className="w-1/3 flex flex-row">
                <Input type="email" placeholder="Email" />
                <Button type="submit">Subscribe</Button>
            </div ></>

    )
}

export default SearchButton