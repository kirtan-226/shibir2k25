import { Controller, Post, Body } from '@nestjs/common';
import { FormService } from './form.service';
// import { CreateUserDto } from './dto/create-entry.dto';

@Controller('api')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post('new-entry')
  async createEntry(@Body() body: any) {
    console.log('Received body:', JSON.stringify(body, null, 2));

    if (!body.shibirId) {
      console.error('Missing shibirId in request!');
    }

    try {
      const savedData = await this.formService.saveEntry(body);
      console.log('Data saved successfully:', JSON.stringify(savedData, null, 2));
      return {
        message: 'Entry created successfully',
        data: savedData,
      };
    } catch (error) {
      console.error('Failed to save entry:', error);
      return {
        message: 'Failed to create entry',
        error: error.message || error,
      };
    }
  }
}
