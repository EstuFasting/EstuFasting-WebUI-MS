import React, {useEffect, useState} from 'react';
import CateringService from "../services/cateringService";
import {addDays, dateToDateString, getFirstWeekDayOfDate} from "../utilities/dateUtils";
import {handleCatch, range} from "../utilities/utils";
import {Dropdown, Icon, Loader} from "semantic-ui-react";
import DisabledCateringCard from "../components/DisabledCateringCard";
import DisplayCateringCard from "../components/DisplayCateringCard";
import MenuItemService from "../services/menuItemService";
import {toast} from "react-toastify";
import CateringCard from "../components/CateringCard";

function MenuEdit(props) {

    const cateringService = new CateringService();
    const menuItemService = new MenuItemService();
    const defaultFirstWeekDay = getFirstWeekDayOfDate(addDays(new Date(), 2));

    const [caterings, setCaterings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMeal, setSelectedMeal] = useState(2);
    const [selectedFirstWeekDay, setSelectedFirstWeekDay] = useState(defaultFirstWeekDay);
    const [dateCateringMap, setDateCateringMap] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        menuItemService.get().then(response => {
            setMenuItems(response.data.data.content)
        }).catch(handleCatch)
    }, [])

    useEffect(() => {
        cateringService.getCateringsDateBetween(selectedFirstWeekDay).then(response => {
            setCaterings(response.data.data.content);
            setLoading(false)
        }).catch(handleCatch)
    }, [selectedFirstWeekDay])

    useEffect(() => {
        const temp = []
        for (let i = 0; i < 7; i++) {
            if (i % 7 >= 5) continue;
            const date = dateToDateString(addDays(selectedFirstWeekDay, i));
            temp.push({
                date: date,
                catering: caterings.find(catering => catering.date === date && catering.meal.id === selectedMeal)
            });
        }
        setDateCateringMap(temp)
    }, [selectedMeal, caterings])

    const mealOptions = [
        {key: 2, text: "Öğle Yemeği", value: 2},
        {key: 3, text: "Akşam Yemeği", value: 3}
    ]

    const weekOptions = range(9, -1).map(i => {
        const date = addDays(defaultFirstWeekDay, i * 7);
        return {
            key: i,
            text: `${dateToDateString(date).replaceAll("-", "/")} - ${dateToDateString(addDays(date, 5)).replaceAll("-", "/")}`,
            value: date
        }
    })

    if (loading)
        return <Loader content={<div><Icon name="glass martini"/> Menüler getiriliyor...</div>} inline='centered'
                       style={{marginTop: 100, marginBottom: 1000}} active size="large"/>

    return (
        <div className="menu-edit-wrapper shadow">
            <Dropdown className="catering-dropdown me-5" selection options={weekOptions} defaultValue={defaultFirstWeekDay}
                      onChange={(event, data) => setSelectedFirstWeekDay(data.value)} selectOnBlur={false}/>
            <Dropdown className="catering-dropdown" selection options={mealOptions} defaultValue={2} selectOnBlur={false}
                      onChange={(event, data) => setSelectedMeal(data.value)}/>
            <div className="row row-cols-1 row-cols-md-5 g-3 mt-4">
                {dateCateringMap.map((entry, index) => {
                    return (
                        <div className="col mb-5" id={String(entry.date)}>
                            <CateringCard entry={entry} menuItems={menuItems} mealId={selectedMeal} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MenuEdit;