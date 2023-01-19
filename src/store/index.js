
import {useContext} from "react"
import {createContext} from "react"


// bos bir merkezi state olusturduk
const StoreContext = createContext();

export const useStore = ()=> useContext(StoreContext)

export const StoreProvider = ({children}) => {
    return(
<StoreContext.Provider value={{}}>
    {children}
</StoreContext.Provider>
    )
}