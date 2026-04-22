import { Suspense } from "react";
import OceanSuccessPage from "./OceanSuccessPage";


export default function Page() {
    
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OceanSuccessPage />
        </Suspense>
    );
}