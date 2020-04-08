import "reflect-metadata";
import * as express from "express";
import { inject } from "inversify";
import { request,
  controller, httpDelete, httpGet, httpPost, httpPut, requestParam, httpPatch, queryParam,
} from "inversify-express-utils";
import TYPES from "./../../4_infrastructure/container/TYPES";
import { Customer } from "./../../3_domain/models/customer";
import { ICustomerService } from "./../../2_application/customer/customerServiceInterface";
import { Address } from "./../../3_domain/models/address";
import { OrderItem } from "./../../3_domain/models/orderItem";

@controller("/customers")
export class CustomerController {
    private customerService: ICustomerService;

  constructor(@inject(TYPES.ICustomerService) customerService: ICustomerService) {
      this.customerService = customerService;
  }

  @httpGet("/")
  public getAllCutomers(): Customer[] {
      return this.customerService.getAll();
  }

  @httpGet("/:id")
  public getCustomerById(@requestParam("id") id: string): Customer {
      return this.customerService.getById(id);
  }

  @httpPost("/")
  public createCustomer(@request() req: express.Request): Customer {
      return this.customerService.createCustomer( req.body as Customer);
  }

  @httpPut("/:id")
  public updateCustomer(@requestParam("id") id: string, @request() req: express.Request): Customer {
      return this.customerService.updateCustomer(id, req.body as Customer);
  }

  @httpDelete("/:id")
  public deleteCustomer(@requestParam("id") id: string): void {
      this.customerService.deleteCustomer(id);
  }

  @httpPatch("/:id/address")
  public addAddress(@requestParam("id") id: string, @request() req: express.Request): boolean {
      return this.customerService.addAddressToCustomer(id, req.body as Address);
  }

  @httpPost("/:id/purchase")
  public purchase(@requestParam("id") id: string): string {
      return this.customerService.purchase(id);
  }

  @httpPatch("/:id/email")
  public updateCustomerEmail(@requestParam("id") id: string,  @queryParam("email") email: string): Customer {
      return this.customerService.updateCustomerEmail(id, email);
  }

  @httpPut("/:id/cart")
  public addItemToCart(@requestParam("id") id: string,
                       @queryParam("productId") productId: string,
                       @queryParam("quantity") quantity: number): boolean {
      return this.customerService.addItemToCart(id, productId, +quantity);
  }
  @httpDelete("/:id/cart")
  public removeItemFromCart(@requestParam("id") id: string,
                            @queryParam("productId") productId: string,
                            @queryParam("quantity") quantity: number): boolean {
      return this.customerService.removeItemFromCart(id, productId, +quantity);
  }

  @httpDelete("/:id/cart/empty")
  public emptyCart(@requestParam("id") id: string): Customer {
      return this.customerService.emptyCart(id);
  }
}
