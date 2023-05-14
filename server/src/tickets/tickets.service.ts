import { Injectable } from '@nestjs/common';
import { Ticket } from '@acme/shared-models';
import { UsersService } from '../users/users.service';

@Injectable()
export class TicketsService {
  /*
   * In-memory storage so data is lost on server restart.
   */
  private storedTickets: Ticket[] = [
    {
      id: 1,
      description: 'Install a monitor arm',
      assigneeId: 1,
      completed: false,
    },
    {
      id: 2,
      description: 'Move the desk to the new location',
      assigneeId: 1,
      completed: true,
    },
    {
      id: 3,
      description: 'Test 1',
      assigneeId: 3,
      completed: true,
    },
    {
      id: 4,
      description: 'Test 2',
      assigneeId: 4,
      completed: false,
    },
  ];

  private nextId = 5; //  tăng dần khi tạo

  constructor(private usersService: UsersService) {}

  // ngôn ngữ đơn luồng, trong 1 thời gian, chỉ xử lý được 1 việc.

  async tickets(): Promise<Ticket[]> {
    return this.storedTickets;
  }

  async ticket(id: number): Promise<Ticket | null> {
    return this.storedTickets.find((t) => t.id === id) ?? null;
  }
// Tạo mới
//Promise: 
  async newTicket(payload: { description: string }): Promise<Ticket> {
    const newTicket: Ticket = {
      id: this.nextId++,
      description: payload.description,
      assigneeId: null,
      completed: false,
      
    };

    this.storedTickets.push(newTicket);

    return newTicket;
  }

  async assign(ticketId: number, userId: number): Promise<boolean> {
    const ticket = await this.ticket(ticketId);
    const user = await this.usersService.user(userId);

    if (ticket && user) {
      ticket.assigneeId = +userId;
      return true;
    } else {
      return false;
    }
  }

  async unassign(ticketId: number): Promise<boolean> {
    const ticket = await this.ticket(ticketId); // bat dong bo, can thoi gian de thuc hien xong.
    if (ticket) {
      ticket.assigneeId = null;
      return true;
    } else {
      return false;
    }
  }

  async complete(ticketId: number, completed: boolean): Promise<boolean> {
    const ticket = await this.ticket(ticketId);
    if (ticket) {
      ticket.completed = completed;
      return true;
    } else {
      return false;
    }
  }
  async delete(ticketId: number): Promise<boolean> {
    const ticket = await this.ticket(ticketId);

    if (ticket) {
      const x = await this.storedTickets.filter((item) => {
        return item.id !== ticketId;
      });
      this.storedTickets = x;
    } else {
      return false;
    }
  }
}
