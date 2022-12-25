import React, {useState} from 'react';
import EditCateringCard from "./EditCateringCard";
import {isInThePast, weekdayName} from "../utilities/dateUtils";
import {toast} from "react-toastify";
import {handleCatch} from "../utilities/utils";
import CateringService from "../services/cateringService";

function DisplayCateringCard({date, catering, menuItems, postUpdate}) {

    const cateringService = new CateringService()
    const [editModeFlag, setEditModeFlag] = useState(false);

    const inThePast = isInThePast(new Date(date));

    const updateCatering = (selectedMenuItems) => {
        if (selectedMenuItems.length !== 4 || selectedMenuItems.find(e => !e) !== undefined) {
            toast.warning("4 adet menü öğesi seçiniz")
            return
        }
        const model = {
            cateringId: catering.id,
            menuItemIds: selectedMenuItems
        }
        cateringService.updateMenuItems(model).then(() => {
            postUpdate(catering.id, selectedMenuItems)
            setEditModeFlag(false)
        }).catch(handleCatch)
    }

    const handleClick = () => {
        if (inThePast) {
            toast.warning("Geçmiş tarihli menüler üzerinde düzenleme yapılamaz")
            return;
        }
        setEditModeFlag(!editModeFlag)
    }

    if (editModeFlag === true) return <EditCateringCard date={date} action={updateCatering} menuItems={menuItems}
                                                        defaultMenuItems={catering.menuItems} exit={() => setEditModeFlag(false)}/>

    return (
        <div className="card h-auto catering-card border-0">
            <div className="card-header w-100">
                <div className="d-block"
                     style={{marginBottom: -5}}>{weekdayName(date)}</div>
            </div>
            <ul className="list-group list-group-flush">
                {catering.menuItems.map(item =>
                    <li className="list-group-item" id={String(item.id)}>
                        <span className="float-start mx-2">{item.name}</span>
                        <div className="vr bg-black h-100 position-absolute"
                             style={{width: 1, opacity: .2, right: "28%", top: 0}}/>
                        <span className="float-end cal-info">{item.calories}<sup>cal</sup></span>
                    </li>
                )}
            </ul>
            <div className="card-footer p-0">
                <button className={`container-fluid m-0 h-100 border-0 action-button`}
                        style={{backgroundColor: "#2C4F00"}} onClick={handleClick}>
                    MENÜYÜ DÜZENLE
                </button>
            </div>
        </div>
    );
}

export default DisplayCateringCard;