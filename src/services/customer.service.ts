import { Customer } from '@/types/customer'
import { CreateCustomerInput, UpdateCustomerInput } from '@/lib/validations/customer'
import { CustomerRepository } from '@/repositories/customer.repository'
import { FindManyOptions } from '@/repositories/base.repository'

export class CustomerService {
  private static repository = new CustomerRepository()

  static async getCustomers(search?: string): Promise<Customer[]> {
    const options: FindManyOptions = {}
    
    if (search) {
      options.search = search
    }

    return this.repository.findMany(options)
  }

  static async getCustomer(id: string): Promise<Customer> {
    const customer = await this.repository.findUnique(id)
    
    if (!customer) {
      throw new Error('Customer not found')
    }

    return customer
  }

  static async createCustomer(data: CreateCustomerInput): Promise<Customer> {
    // Business logic can be added here
    // For example: duplicate email check, data transformation, etc.
    
    return this.repository.create(data)
  }

  static async updateCustomer(id: string, data: UpdateCustomerInput): Promise<Customer> {
    // Verify customer exists
    await this.getCustomer(id)
    
    // Business logic can be added here
    // For example: email uniqueness validation, etc.
    
    return this.repository.update(id, data)
  }

  static async deleteCustomer(id: string): Promise<void> {
    // Check if customer has invoices
    const hasInvoices = await this.repository.hasInvoices(id)
    
    if (hasInvoices) {
      throw new Error('Cannot delete customer with existing invoices')
    }

    await this.repository.delete(id)
  }
}