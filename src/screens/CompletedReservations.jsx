import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Modal } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';

const CompletedReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingReservationId, setDeletingReservationId] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('https://technicians.onrender.com/completedReservations');
      setReservations(response.data);
    } catch (error) {
      console.log('Error fetching completed reservations:', error);
    }
  };

  const deleteReservation = async (id) => {
    try {
      await axios.delete(`https://technicians.onrender.com/completedReservations/${id}`);
      fetchReservations(); // Refresh the completed reservations list after deletion
      setShowDeleteModal(false); // Close the delete confirmation modal
    } catch (error) {
      console.log('Error deleting completed reservation:', error);
    }
  };

  const deleteAllReservations = async () => {
    try {
      const response = await axios.delete('https://technicians.onrender.com/completedReservations');
      if (response.status === 200) {
        fetchReservations(); // Refresh the completed reservations list after deletion
        setShowDeleteModal(false); // Close the delete confirmation modal
      }
    } catch (error) {
      console.log('Error deleting all completed reservations:', error);
    }
  };

  const handleDeleteClick = (id) => {
    setDeletingReservationId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    deleteReservation(deletingReservationId);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  return (
      <>
        <CustomNavbar />

        <div className="container mt-4">
          <div className="d-flex justify-content-end mb-3">
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Delete All
            </Button>
          </div>

          {reservations.length === 0 ? (
              <p className="text-center">No completed reservations yet.</p>
          ) : (
              <Table striped bordered hover style={{ textAlign: 'center' }}>
                <thead>
                <tr>
                  <th>Complete Time</th>
                  <th>User</th>
                  <th>Technician</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {reservations.map((reservation) => (
                    <tr key={reservation._id}>
                      <td>{new Date(+reservation.completeTime).toLocaleString()}</td>
                      <td>{reservation.user}</td>
                      <td>{reservation.technician}</td>
                      <td>{reservation.category}</td>
                      <td>{reservation.price}</td>
                      <td>
                        <Button variant="danger" onClick={() => handleDeleteClick(reservation._id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </Table>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete all completed reservations?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete All
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  );
};

export default CompletedReservationsPage;
