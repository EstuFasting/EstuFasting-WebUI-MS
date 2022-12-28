import React, {useState} from 'react';
import {handleCatch, range} from "../utilities/utils";
import EditCateringCard from "./EditCateringCard";
import {isInThePast, weekdayName} from "../utilities/dateUtils";
import CateringService from "../services/cateringService";
import {toast} from "react-toastify";

function DisabledCateringCard({date, mealId, menuItems, postCreate}) {

    const cateringService = new CateringService();

    const [editModeFlag, setEditModeFlag] = useState(false);

    const inThePast = isInThePast(new Date(date));

    const createCatering = (selectedMenuItems) => {
        if (selectedMenuItems.length !== 4 || selectedMenuItems.find(e => !e) !== undefined) {
            toast.warning("4 adet menü öğesi seçiniz")
            return;
        }
        const model = {
            date: date,
            mealId: mealId,
            menuItemIds: selectedMenuItems
        }
        return cateringService.create(model).then(response => {
            postCreate(response.data.data)
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

    if (editModeFlag === true) return <EditCateringCard date={date} action={createCatering} menuItems={menuItems}
                                                        exit={() => setEditModeFlag(false)}/>

    return (
        <div className="card h-auto catering-card border-0">
            <div className="card-header w-100">
                <div className="d-block"
                     style={{marginBottom: -5}}>{weekdayName(date)}</div>
            </div>
            <ul className="list-group list-group-flush opacity-50">
                {range(4).map(() => {
                    return (
                        <li className="list-group-item">
                            <span className="float-start mx-2">-</span>
                            <div className="vr bg-black h-100 position-absolute"
                                 style={{width: 1, opacity: .2, right: "28%", top: 0}}/>
                            <span className="float-end cal-info">-<sup>cal</sup></span>
                        </li>
                    )
                })}
            </ul>
            <div className="card-footer p-0">
                <button className={`container-fluid m-0 h-100 border-0 action-button`}
                        style={{backgroundColor: "#BA2525"}} onClick={handleClick}>
                    MENÜYÜ OLUŞTUR
                </button>
            </div>
        </div>
    );
}

export default DisabledCateringCard;