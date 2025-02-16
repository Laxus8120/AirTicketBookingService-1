const { Booking } = require("../models/booking");
const { AppError, ValidationError } = require("../utils/errors/index");
const { StatusCodes } = require("http-status-codes");

class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot create Booking",
        "There was some issue creating the booking,please try again later ",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateBooking(bookingId, data) {
    try {
      await Booking.update(data, {
        where: {
          id: bookingId,
        },
      });
      return true;
    } catch (error) {
      throw new AppError(
        "RepositoryError",
        "Cannot update Booking",
        "There was some issue updating the booking,please try again later ",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
