import React, {useContext} from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { Card } from 'react-bootstrap';

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <div style={{flexWrap: 'wrap'}} className="d-flex">
                {device.brands.map(brand => 
                    
                        <Card
                            onClick={() => device.setSelectedBrand(brand)}
                            key={brand.id}
                            className="p-3 m-1"
                            border={brand.id === device.selectedBrand.id ? "danger" : "light"}
                            style={{cursor: 'pointer'}}
                        >
                            {brand.name}
                        </Card>
                    
                )}
        </div>
    );
});

export default BrandBar;