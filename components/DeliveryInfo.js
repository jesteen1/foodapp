'use client';

export default function DeliveryInfo({ address, orderId }) {
  if (!address) return null;

  const deliveryPerson = {
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    vehicle: "Bike",
    estimatedTime: "30-45 minutes"
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Delivery Information</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Delivery Address</h4>
          <p className="text-gray-600">
            {address.name}<br />
            {address.address}<br />
            {address.city}, {address.state} - {address.zipCode}<br />
            Phone: {address.phone}
          </p>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-700 mb-2">Assigned Delivery Person</h4>
          <div className="space-y-1 text-gray-600">
            <p><strong>Name:</strong> {deliveryPerson.name}</p>
            <p><strong>Contact:</strong> {deliveryPerson.phone}</p>
            <p><strong>Vehicle:</strong> {deliveryPerson.vehicle}</p>
            <p><strong>Estimated Delivery:</strong> {deliveryPerson.estimatedTime}</p>
          </div>
        </div>

        {orderId && (
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              <strong>Order ID:</strong> {orderId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

