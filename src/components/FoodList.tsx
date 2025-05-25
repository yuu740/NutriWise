import React, { FC, useCallback, useEffect, useState } from "react";
import moment, { Moment } from "moment";
import {
  AddFood,
  AddFoodReqDTO,
  DelFoodReqDTO,
  FoodlistResDTO,
  FoodListTable,
} from "../interface/Foodlist";
import { Button, Card, Table, Spinner } from "react-bootstrap";
import { ModalAdd } from "./ModalAdd";
import {ModalDel} from "./ModalDel";
import { ApiService } from "../constant/ApiService";
import { getExpiryStatus } from "../utils/getExpStatus";

interface FoodListProps {
  username?: string;
  foodItems?: FoodlistResDTO[];
  onFoodAdded: () => void;
}

export const FoodList: FC<FoodListProps> = ({
  username,
  foodItems = [],
  onFoodAdded,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [foodListState, setFoodListState] = useState<FoodListTable[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<FoodListTable | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const converted = foodItems.map((item) => ({
      log_id: item.log_id,
      food_name: item.food_name,
      quantity: item.quantity,
      expiry_date: moment(item.expiry_date).toDate(),
      status: getExpiryStatus(item.expiry_date).status,
    }));

    setFoodListState((prev) => {
      if (
        prev.length === converted.length &&
        prev.every((item, index) => item.log_id === converted[index].log_id)
      ) {
        return prev;
      }
      return converted;
    });
    setIsLoading(false);
  }, [foodItems]);

  const handleAddModalToggle = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);
  const handleDeleteModalToggle = useCallback(() => {
    setIsDeleteModalOpen((prev) => !prev);
    if (isDeleteModalOpen) {
      setDeleteItem(null);
    }
  }, [isDeleteModalOpen]);

  const addFoodHandler = useCallback(
    async (newFood: AddFood) => {
      if (!newFood.food_name || !newFood.quantity || !newFood.expiry_date)
        return;

      const newFoodItem: AddFoodReqDTO = {
        username: username ?? "Guest",
        food_name: newFood.food_name,
        quantity: newFood.quantity,
        expiry_date: moment(newFood.expiry_date).format("YYYY-MM-DD"),
      };

      try {
        await ApiService.addFoodList(newFoodItem);
        onFoodAdded();
        handleAddModalToggle();
      } catch (error) {
        console.error("Failed to save to backend:", error);
      }
    },
    [username, onFoodAdded, handleAddModalToggle]
  );

  const formatDate = (date: Date | Moment) => {
    return moment(date).isValid() ? moment(date).format("MMMM Do YYYY") : "Invalid Date";
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems((prev) => {
      const isSelected = prev.includes(id);
      return isSelected
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id];
    });
  };
  const handleSelectAll = useCallback(() => {
    if (
      selectedItems.length === foodListState.length &&
      foodListState.length > 0
    ) {
      setSelectedItems([]);
    } else {
      setSelectedItems(foodListState.map((item) => item.log_id));
    }
  }, [selectedItems, foodListState]);

  const confirmSingleDelete = async () => {
    if (deleteItem) {
      try {
        const delReq: DelFoodReqDTO = { username: username??"Guest", log_id: deleteItem.log_id };
        await ApiService.deleteFoodList(delReq);
        onFoodAdded(); 
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
      handleDeleteModalToggle(); 
      setDeleteItem(null); 
    }
  };

  const confirmSelectedDelete = async () => {
    try {
      for (const log_id of selectedItems) {
        const delReq: DelFoodReqDTO = {username: username ?? "Guest", log_id: log_id};
        await ApiService.deleteFoodList(delReq);
      }
      onFoodAdded(); 
      setSelectedItems([]); 
    } catch (error) {
      console.error("Failed to delete selected items:", error);
    }
    handleDeleteModalToggle();
  };

  const getDeletionHandler = () => {
    return deleteItem ? confirmSingleDelete : confirmSelectedDelete;
  };

  return (
    <div className="py-8 position-relative">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center py-12">
          <Spinner animation="border" variant="warning" />
        </div>
      ) : foodListState.length > 0 ? (
        <>
          <div className="d-flex justify-content-end mb-3">
            <Button
              variant="warning"
              onClick={handleAddModalToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="me-2"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Add Food Item
            </Button>
          </div>
        <Card className="overflow-hidden">
          <Table responsive>
            <thead>
              <tr className="bg-amber-100">
                <th className="w-12 text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={
                      selectedItems.length === foodItems.length &&
                      foodItems.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Food Type</th>
                <th>Quantity</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foodListState.map((item) => {
                const status = getExpiryStatus(item.expiry_date);
                return (
                  <tr
                    key={item.log_id}
                    className={
                      selectedItems.includes(item.log_id) ? "bg-amber-50" : ""
                    }
                  >
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedItems.includes(item.log_id)}
                        onChange={() => toggleItemSelection(item.log_id)}
                      />
                    </td>
                    <td className="font-medium">{item.food_name}</td>
                    <td>{item.quantity}</td>
                    <td>{formatDate(item.expiry_date)}</td>
                    <td>
                      <span
                        className={
                          status.status === "expired" || status.days <= 2
                            ? "badge bg-danger  text-white"
                            : status.days <= 5
                            ? "badge bg-warning text-dark"
                            : "badge bg-success text-white"
                        }
                      >
                        {status.status === "expired"
                          ? `Expired ${
                              status.days > 1
                                ? `${status.days} days ago`
                                : "today"
                            }`
                          : status.days === 0
                          ? "Expires today"
                          : status.days === 1
                          ? "Expires tomorrow"
                          : `${status.days} days left`}
                      </span>
                    </td>
                    <td className="text-right">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setDeleteItem(item);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                        <span className="sr-only">Delete</span>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {selectedItems.length > 0 && (
            <div className="p-4 bg-amber-50 border-top border-amber-200 d-flex justify-content-between align-items-center">
              <p className="text-sm text-amber-800">
                {selectedItems.length} item(s) selected
              </p>
              <Button
                variant="outline-danger"
                size="sm"
                 onClick={() => {
                  setDeleteItem(null); 
                  handleDeleteModalToggle(); 
                }}
              >
                Delete Selected
              </Button>
            </div>
          )}
        </Card>
        </>
      ) : (
        <Card className="text-center p-5 custom-card-shadow">
          <div className="mx-auto mb-4 rounded-circle bg-amber-100 d-flex align-items-center justify-content-center icon-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-amber-600"
            >
              <path d="M14 22H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h8" />
              <path d="M13.3 2H13v10h10V7.7" />
              <path d="m13 5.5 7.5 7.5" />
            </svg>
          </div>
          <h3 className="mb-3">Your food list is empty</h3>
          <p className="text-muted mb-4 mx-auto max-w-md">
            Start tracking your food inventory by adding items. This will help
            you monitor expiration dates and plan your meals more effectively.
          </p>
          <Button
            variant="warning"
            size="lg"
            className="add-item-button floating-add-button"
            onClick={handleAddModalToggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="me-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Add Food Item
          </Button>
        </Card>
      )}
      <ModalAdd
        show={isOpenModal}
        onClose={handleAddModalToggle}
        onSubmit={addFoodHandler}
      />

       <ModalDel
        show={isDeleteModalOpen}
        onClose={handleDeleteModalToggle}
        onConfirm={getDeletionHandler()}
        itemToDeleteName={deleteItem ? deleteItem.food_name : null}
        selectedItemsCount={selectedItems.length}
      />

      <div className="mt-5 row g-4">
        <div className="col-md-4">
          <Card className="p-4">
            <div className="mb-3 rounded-circle bg-amber-100 d-flex align-items-center justify-content-center feature-icon-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-amber-600"
              >
                <path d="M11 12H3" />
                <path d="M16 6H3" />
                <path d="M16 18H3" />
                <path d="M18 9v6" />
                <path d="M21 12h-6" />
              </svg>
            </div>
            <h4 className="mb-2">Track Your Food</h4>
            <p className="text-muted small">
              Add food items to your inventory to keep track of what you have
              and when it expires.
            </p>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="p-4">
            <div className="mb-3 rounded-circle bg-amber-100 d-flex align-items-center justify-content-center feature-icon-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-amber-600"
              >
                <path d="M10 2v8L5 8" />
                <path d="M14 10h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2" />
                <path d="M8 18v-1a2 2 0 0 1 2-2h2" />
                <path d="M4 21a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2" />
              </svg>
            </div>
            <h4 className="mb-2">Reduce Food Waste</h4>
            <p className="text-muted small">
              Get notified before your food expires so you can use it before it
              goes bad.
            </p>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="p-4">
            <div className="mb-3 rounded-circle bg-amber-100 d-flex align-items-center justify-content-center feature-icon-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-amber-600"
              >
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
                <line x1="6" x2="18" y1="17" y2="17" />
              </svg>
            </div>
            <h4 className="mb-2">Discover Recipes</h4>
            <p className="text-muted small">
              Find recipes based on the ingredients you already have in your
              food list.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
