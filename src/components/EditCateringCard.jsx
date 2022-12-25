import React, {useEffect, useState} from 'react';
import {range} from "../utilities/utils";
import {weekdayName} from "../utilities/dateUtils";
import {Form, Icon, Table} from "semantic-ui-react";

function EditCateringCard({date, action, menuItems, defaultMenuItems = [], exit}) {

    const [selectedMenuItems, setSelectedMenuItems] = new useState(defaultMenuItems.map(e => e.id));
    const [calories, setCalories] = new useState([]);
    const [menuItemsOptions, setMenuItemsOptions] = new useState([]);

    useEffect(() => {
        for (let i = 0; i < 4; i++)
            calories[i] = caloriesByItemId(selectedMenuItems[i]);
        setCalories([...calories]);
        setMenuItemsOptions(menuItems.map(item => ({
            key: item.id,
            text: item.name,
            value: item.id,
            disabled: selectedMenuItems.find(menuItem => menuItem === item.id) !== undefined
        })))
    }, [selectedMenuItems]);

    const handleMenuItemSelect = (data, index) => {
        selectedMenuItems[index] = data.value
        setSelectedMenuItems([...selectedMenuItems])
    }

    const caloriesByItemId = (id) => {
        if (!id) return "-"
        return menuItems.find(item => item.id === id).calories
    }

    const save = () => {
        action(selectedMenuItems)
    }

    return (
        <div className="card h-auto catering-card border-0">
            <div className="card-header w-100">
                <div className="d-block"
                     style={{marginBottom: -5}}>{weekdayName(date)}</div>
            </div>
            <Table textAlign={"left"} basic={"very"} celled className="p-0 m-0">
                <Table.Body>
                    {range(4).map((i) =>
                        <Table.Row style={{height: 50}}>
                            <Table.Cell className="catering-card-cell" style={{fontSize: 12}}>
                                <Form.Dropdown options={menuItemsOptions} className="menu-item-dropdown" upward
                                               placeholder={"Menü Öğesi Seçiniz"} search selectOnBlur={false}
                                               defaultValue={defaultMenuItems[i]?.id} noResultsMessage="Menü öğesi bulunamadı"
                                               onChange={(event, data) => handleMenuItemSelect(data, i)}/>
                            </Table.Cell>
                            <Table.Cell collapsing className="px-2 catering-card-cell">
                                <span className="float-end cal-info">{calories[i]}<sup>cal</sup></span>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            <div className="card-footer p-0 border-0">
                <button className={`container-fluid m-0 h-100 border-0 action-button`}
                        style={{backgroundColor: "#4d4d4d", borderBottomRightRadius: 0, width: "20%"}} onClick={exit}>
                    <Icon name="angle left" size="big"/>
                </button>
                <button className={`container-fluid m-0 h-100 border-0 action-button`}
                        style={{backgroundColor: "#FFB951", borderBottomLeftRadius: 0, width: "80%"}} onClick={save}>
                    MENÜYÜ KAYDET
                </button>
            </div>
        </div>
    );
}

export default EditCateringCard;