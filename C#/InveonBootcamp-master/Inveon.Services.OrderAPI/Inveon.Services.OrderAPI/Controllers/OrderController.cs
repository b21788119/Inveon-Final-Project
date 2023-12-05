using Inveon.Services.OrderAPI.Dto;
using Inveon.Services.OrderAPI.Models;
using Inveon.Services.OrderAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Inveon.Services.OrderAPI.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrderController : ControllerBase
    {
        protected ResponseDto _response;
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
            this._response = new ResponseDto();
        }


        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<object> GetOrdersWithDetails()
        {
            try
            {
                IEnumerable<OrderHeaderDto> orders = await _orderRepository.GetAllOrders();
                _response.Result = orders;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages
                     = new List<string>() { ex.ToString() };
            }
            return _response;
        }


        [HttpGet]
        [Authorize]
        [Route("{userId}")]

        public async Task<object> GetOrdersWithDetails(string userId)
        {
            try
            {
                IEnumerable<OrderHeaderDto> orders = await _orderRepository.GetOrdersWithDetails(userId);
                _response.Result = orders;
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages
                     = new List<string>() { ex.ToString() };
            }
            return _response;
        }

        

    }
}
