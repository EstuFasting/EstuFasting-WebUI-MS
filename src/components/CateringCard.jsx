import React, {useEffect, useState} from 'react';
import DisabledCateringCard from "./DisabledCateringCard";
import DisplayCateringCard from "./DisplayCateringCard";
import {toast} from "react-toastify";

function CateringCard({entry, menuItems, mealId}) {

    const [catering, setCatering] = useState(entry.catering);

    useEffect(() => {
        setCatering(entry.catering)
    }, [entry, mealId])

    const postCreate = (newCatering) => {
        setCatering(newCatering)
        toast.success("Menü Oluşturuldu")
    }

    const postUpdate = (cateringId, newMenuItemIds) => {
        setCatering({...catering, menuItems: menuItems.filter(item => newMenuItemIds.includes(item.id))})
        toast.success("Menü Güncellendi");
    }

    if (!catering) return <DisabledCateringCard date={entry.date} mealId={mealId} menuItems={menuItems}
                                                      postCreate={postCreate}/>
    return <DisplayCateringCard date={entry.date} catering={catering} menuItems={menuItems}
                                postUpdate={postUpdate}/>
}

export default CateringCard;